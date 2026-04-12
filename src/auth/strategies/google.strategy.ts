import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL')!,
      scope: ['email', 'profile'],
    } as StrategyOptions); // ✅ cast to StrategyOptions
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
  const email = profile.emails?.[0]?.value;
  const name = profile.name
    ? `${profile.name.givenName ?? ""} ${profile.name.familyName ?? ""}`.trim()
    : profile.displayName ?? "Unknown User";

  return { email, name };
}

}
