import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { DatabaseModule } from '@/database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import ValidationSchema from '@/utils/validationSchema';
import { UsersModule } from '@/users/users.module';
import { AuthModule } from './auth/auth.module';
import { SessionsModule } from './sessions/sessions.module';
import { PersonalModule } from './personal/personal.module';
import { TokensModule } from './tokens/tokens.module';
import { MailerModule } from './mailer/mailer.module';
import { ConfirmationCodesModule } from './confirmation-codes/confirmation-codes.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object(ValidationSchema),
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    SessionsModule,
    PersonalModule,
    TokensModule,
    MailerModule,
    ConfirmationCodesModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
