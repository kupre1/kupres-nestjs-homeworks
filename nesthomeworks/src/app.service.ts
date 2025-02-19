import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getLanguage(lang) {
    const language = {
      ka: [{ id: 1, name: 'ვაშლი', color: 'მწვანე' }],
      en: [{ id: 1, name: 'apple', color: 'green' }],
    };

    return language[lang];
  }
}
