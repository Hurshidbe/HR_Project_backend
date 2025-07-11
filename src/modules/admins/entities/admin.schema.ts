import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from 'src/enums/enums';

@Schema({ timestamps: true })
export class Admin extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: UserRole, default: UserRole.Admin })
  role: UserRole;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
