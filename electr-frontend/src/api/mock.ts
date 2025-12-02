import type { IPaginatedElectrolysis } from "../types/index.ts";

export const ELECTROLYSIS_MOCK: IPaginatedElectrolysis = {
  total: 3,
  items: [
    {
      id: 1,
      title: "Меднение (Copper Plating)",
      text: "Нанесение слоя меди на металлическое изделие для улучшения электропроводности.",
      image_url: undefined, // Убедись, что картинка есть в public
      base_time: 60,
      base_voltage: 12.5,
      material_coefficient: 1.2,
      status: true,
    },
    {
      id: 2,
      title: "Хромирование (Chrome Plating)",
      text: "Декоративное и защитное покрытие хромом для защиты от коррозии.",
      image_url: undefined,
      base_time: 120,
      base_voltage: 24.0,
      material_coefficient: 2.5,
      status: true,
    },
    {
      id: 3,
      title: "Никелирование",
      text: "Покрытие никелем для защиты от окисления и придания блеска.",
      image_url: undefined, // Проверка дефолтной картинки
      base_time: 90,
      base_voltage: 5.5,
      material_coefficient: 1.8,
      status: false,
    },
  ],
};
