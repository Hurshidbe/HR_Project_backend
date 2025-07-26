import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BotService } from './bot.service';
import { Message } from 'nestjs-telegraf';
import { createAdminDto } from '../admins/dto/admin.dto';
import { Candidate } from '../candidates/entities/candidate.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCandidateDto } from '../candidates/dto/main.candidate.dto';

@Injectable()
export class MessageService {
  constructor(
    @Inject(forwardRef(() => BotService))
    @InjectModel(Candidate.name)
    private readonly botService: BotService,
  ) {}

  async newCandidateMessageForUser(data: CreateCandidateDto) {
    const ADMIN_TG_ID = process.env.ADMIN_TG_ID || 'yoq';
    const personalInfo = data.personalInfo;
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
🚔 <b>Criminal Record:</b> ${data.criminalRecords ? 'Yes' : 'No'}
📝 <b>Additional Info:</b> ${data.extraInfo || 'None'}
🗿 <b>Your form:</b> ${`https://images.app.goo.gl/WcWHNLbRmQTUNXHHA`}
`;
    await this.botService.sendNotify(message, ADMIN_TG_ID);
  }

  async reviewingMessageForCandidate(updated: Candidate) {
    const personalInfo = updated.personalInfo;
    const candidateTgId = updated.telegramId;
    const message = `
🔍 <b>Arizangiz ko'rib chiqilmoqda</b>

Hurmatli ${personalInfo.fullName},

Siz topshirgan ariza hozirda mutaxassislarimiz tomonidan ko'rib chiqilmoqda. 

⏱ Iltimos, biroz sabrli bo'ling — tez orada siz bilan bog'lanamiz.  
📞 Telefoningiz va Telegramingizni doimiy faol holatda saqlang.

Rahmat!
🗿 <b>Your form:</b> ${`https://images.app.goo.gl/WcWHNLbRmQTUNXHHA`}
`;

    await this.botService.sendNotify(message, candidateTgId);
  }

  async acceptedMessageForCandidate(candidate: Candidate) {
    const personalInfo = candidate.personalInfo;
    const candidateTgId = candidate.telegramId;
    const message = `
✅ <b>Arizangiz qabul qilindi</b>

Hurmatli ${personalInfo?.fullName},

Tabriklaymiz! Sizning arizangiz mutaxassislarimiz tomonidan ko'rib chiqildi va ijobiy baholandi.

📞 Tez orada siz bilan bog'lanamiz va keyingi bosqichlar haqida ma'lumot beramiz. 
📲 Telefoningiz va Telegramingizni faol holatda saqlang.

Rahmat va muvaffaqiyat tilaymiz!
🗿 <b>Your form:</b> ${`https://images.app.goo.gl/WcWHNLbRmQTUNXHHA`}
`;
    await this.botService.sendNotify(message, candidateTgId);
  }

  async rejectedMessageForCandidate(candidate: Candidate) {
    const personalInfo = candidate.personalInfo;
    const candidateTgId = candidate.telegramId;
    const message = `
❌ <b>Arizangiz rad etildi</b>

Hurmatli ${personalInfo?.fullName},

Afsuski, arizangiz mutaxassislarimiz tomonidan ko'rib chiqildi va hozircha ijobiy baholanmadi.

📝 Siz istasangiz, keyinchalik yana ariza topshirishingiz mumkin. Hujjatlaringizni va tajribangizni yana bir bor ko'rib chiqing.

📲 Telefoningiz va Telegramingizni faol holatda saqlang — yangi imkoniyatlar haqida sizni xabardor qilamiz.

Omad tilaymiz!
🗿 <b>Your form:</b> ${`https://images.app.goo.gl/WcWHNLbRmQTUNXHHA`}
`;

    await this.botService.sendNotify(message, candidateTgId);
  }
}
