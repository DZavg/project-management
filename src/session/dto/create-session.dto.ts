import { IsOptional } from 'class-validator';
import { User } from '@/users/entities/user.entity';

export class CreateSessionDto {
  accessToken: string;
  refreshToken: string;
  user: User;
  @IsOptional()
  revoked?: boolean = false;
}
