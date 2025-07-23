import { Injectable } from '@nestjs/common';
import { BotService } from './bot.service';
import { CreateCandidateDto } from '../candidates/dto/candidate.dto';
import { Message } from 'nestjs-telegraf';

@Injectable()
export class MessageService {
  constructor(private readonly botService: BotService) {}
  async candidateMessage(data: CreateCandidateDto) {
    const personalInfo = data.personalInfo[0];
    const message = `
🆕 <b>New Candidate!</b>

👤 <b>Full Name:</b> ${personalInfo?.fullName}
🚻 <b>Gender:</b> ${personalInfo?.sex}
🎂 <b>Birth Date:</b> ${personalInfo?.birthDate}
📞 <b>Phone:</b> ${personalInfo?.phoneNumber}
📧 <b>Email:</b> ${personalInfo?.email}
💬 <b>Telegram:</b> ${personalInfo?.tgUsername}
📍 <b>Region:</b> ${personalInfo?.region}
🏠 <b>Address:</b> ${personalInfo?.address}
💼 <b>Occupation:</b> ${personalInfo?.occupation}
🚗 <b>Driving License:</b> ${data.drivingLicence}
🚔 <b>Criminal Record:</b> ${data.criminalRecord ? 'Yes' : 'No'}
📝 <b>Additional Info:</b> ${data.extraInfo || 'None'}
🗿 <b>Your form:</b> ${`https://images.app.goo.gl/WcWHNLbRmQTUNXHHA`}
`;
    await this.botService.sendNotify(message);
  }
}
