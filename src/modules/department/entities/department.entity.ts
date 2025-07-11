import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Department {
  @Prop()
  name: string;
}
export const DepartmentSchema = SchemaFactory.createForClass(Department);
