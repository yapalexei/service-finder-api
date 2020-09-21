import {inject} from '@loopback/context';
import {HttpErrors, Request} from '@loopback/rest';
import {
  AuthenticationStrategy,
  TokenService,
  // AuthenticationBindings,
  // AuthenticationMetadata,
  // AUTHENTICATION_STRATEGY_NOT_FOUND,
} from '@loopback/authentication';
import {UserProfile} from '@loopback/security';

import {TokenServiceBindings} from '../keys';

export class JWTAuthenticationStrategy implements AuthenticationStrategy {
  name = 'jwt';

  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public tokenService: TokenService,
    // @inject(UserServiceBindings.USER_SERVICE)
    // private userService: UserService,
    // @extensions()
    // private authenticationStrategies: Getter<AuthenticationStrategy[]>,
    // @inject(AuthenticationBindings.METADATA)
    // private metadata?: AuthenticationMetadata,
  ) {}

  // async value(): Promise<AuthenticationStrategy | undefined> {
  //   if (!this.metadata) {
  //     return undefined;
  //   }
  //   const name = this.metadata.strategy;
  //   const strategy = await this.findAuthenticationStrategy(name);
  //   if (!strategy) {
  //     // important to throw a non-protocol-specific error here
  //     const error = new Error(`The strategy '${name}' is not available.`);
  //     Object.assign(error, {
  //       code: AUTHENTICATION_STRATEGY_NOT_FOUND,
  //     });
  //     throw error;
  //   }
  //   return strategy;
  // }

  // /**
  //  * @description This method searches for a strategy "named" in the request and returns
  //  * it if registered.
  //  * @param name the name of the authentication strategy used in the current request.
  //  */
  // async findAuthenticationStrategy(name: string) {
  //   const strategies = await this.authenticationStrategies();
  //   const matchingAuthStrategy = strategies.find(a => a.name === name);
  //   return matchingAuthStrategy;
  // }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token: string = this.extractCredentials(request);
    const userProfile: UserProfile = await this.tokenService.verifyToken(token);
    return userProfile;
  }

  extractCredentials(request: Request): string {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }

    const authHeaderValue = request.headers.authorization;

    if (!authHeaderValue.startsWith('Bearer')) {
      throw new HttpErrors.Unauthorized(
        `Authorization header is not of type 'Bearer'.`,
      );
    }

    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2)
      throw new HttpErrors.Unauthorized(
        `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
      );
    const token = parts[1];

    return token;
  }
}
