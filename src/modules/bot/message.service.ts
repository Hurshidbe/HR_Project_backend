import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BotService } from './bot.service';
import { Message, Update } from 'nestjs-telegraf';
import { createAdminDto } from '../admins/dto/user.dto';
import { Candidate } from '../candidates/entities/candidate.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCandidateDto } from '../candidates/dto/main.candidate.dto';
import { Employee } from '../employee/entities/employee.schema';

@Injectable()
export class MessageService {
  constructor(
    @Inject(forwardRef(() => BotService))
    @InjectModel(Candidate.name)
    private readonly botService: BotService,
  ) {}

  async newCandidateMessageForUser(data: CreateCandidateDto) {
    const ADMIN_TG_ID = process.env.ADMIN_TG_ID || 'yoq';
    const message = `
🆕 <b>New Candidate!</b>

👤 <b>Full Name:</b> ${data.fullName}
🚻 <b>Gender:</b> ${data.sex}
🎂 <b>Birth Date:</b> ${data.birthDate}
📞 <b>Phone:</b> ${data.phoneNumber}
📧 <b>Email:</b> ${data.email}
💬 <b>Telegram:</b> ${data.tgUsername}
📍 <b>Region:</b> ${data.region}
🏠 <b>Address:</b> ${data.address}
💼 <b>Occupation:</b> ${data.occupation}
🚗 <b>Driving License:</b> ${data.drivingLicence}
🚔 <b>Criminal Record:</b> ${data.criminalRecords ? 'Yes' : 'No'}
📝 <b>Additional Info:</b> ${data.extraInfo || ['None']}
🗿 <b>Your form:</b> ${`https://images.app.goo.gl/WcWHNLbRmQTUNXHHA`}
`;
    await this.botService.sendNotify(message, ADMIN_TG_ID);
  }

  async reviewingMessageForCandidate(updated: Candidate) {
    const candidateTgId = updated.telegramId;
    const message = `
🔍 <b>Arizangiz ko'rib chiqilmoqda</b>

Hurmatli ${updated?.fullName},
Siz topshirgan ariza hozirda mutaxassislarimiz tomonidan ko'rib chiqilmoqda. 
⏱ Iltimos, biroz sabrli bo'ling — tez orada siz bilan bog'lanamiz.  
📞 Telefoningiz va Telegramingizni doimiy faol holatda saqlang.
Rahmat!
🗿 <b>Your form:</b> ${`https://images.app.goo.gl/WcWHNLbRmQTUNXHHA`}
`;

    await this.botService.sendNotify(message, candidateTgId);
  }

  async acceptedMessageForCandidate(candidate: Candidate) {
    const candidateTgId = candidate.telegramId;
    const message = `
✅ <b>Arizangiz qabul qilindi</b>

Hurmatli ${candidate?.fullName},
Tabriklaymiz! Sizning arizangiz mutaxassislarimiz tomonidan ko'rib chiqildi va ijobiy baholandi.
📞 Tez orada siz bilan bog'lanamiz va keyingi bosqichlar haqida ma'lumot beramiz. 
📲 Telefoningiz va Telegramingizni faol holatda saqlang.
Rahmat va muvaffaqiyat tilaymiz!
🗿 <b>Your form:</b> ${`https://images.app.goo.gl/WcWHNLbRmQTUNXHHA`}
`;
    await this.botService.sendNotify(message, candidateTgId);
  }

  async rejectedMessageForCandidate(candidate: Candidate) {
    const candidateTgId = candidate?.telegramId;
    const message = `
❌ <b>Arizangiz rad etildi</b>

Hurmatli ${candidate?.fullName},
Afsuski, arizangiz mutaxassislarimiz tomonidan ko'rib chiqildi va hozircha ijobiy baholanmadi.
📝 Siz istasangiz, keyinchalik yana ariza topshirishingiz mumkin. Hujjatlaringizni va tajribangizni yana bir bor ko'rib chiqing.
📲 Telefoningiz va Telegramingizni faol holatda saqlang — yangi imkoniyatlar haqida sizni xabardor qilamiz.
Omad tilaymiz!
🗿 <b>Your form:</b> ${`https://images.app.goo.gl/WcWHNLbRmQTUNXHHA`}
`;

    await this.botService.sendNotify(message, candidateTgId);
  }
}
