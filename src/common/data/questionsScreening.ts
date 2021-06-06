import { Question } from '../interfaces/Question';
import { getContrastColor } from '../utils/GetContrastColorText';
import { TagsColors, TagsOptions } from './tags';

const questionsScreening: Question[] = [
  {
    question:
      'Seu caso está ligado ao Direito de família, como contratos, herança, partilha de bens, guarda ou alimentos?',
    tag: TagsOptions.familyRights,
    color: TagsColors.familyRights,
    textColor: getContrastColor(TagsColors.familyRights),
    subQuestions: [
      {
        question: 'Seu problema está ligado a um contrato?',
        tag: TagsOptions.contracts,
        color: TagsColors.contracts,
        textColor: getContrastColor(TagsColors.contracts),
        subQuestions: [],
      },
      {
        question: 'Trata-se de algo referente a seus filhos?',
        tag: TagsOptions.affiliationAndCustody,
        color: TagsColors.affiliationAndCustody,
        textColor: getContrastColor(TagsColors.affiliationAndCustody),
        subQuestions: [],
      },
      {
        question:
          'É sobre o recebimento de algum bem, após falecimento de algum familiar?',
        tag: TagsOptions.propertiesSuccession,
        color: TagsColors.propertiesSuccession,
        textColor: getContrastColor(TagsColors.propertiesSuccession),
        subQuestions: [],
      },
      {
        question:
          'Você quer se divorciar ou está enfrentando problemas no divórcio?',
        tag: TagsOptions.separationProperties,
        color: TagsColors.separationProperties,
        textColor: getContrastColor(TagsColors.separationProperties),
        subQuestions: [],
      },
    ],
  },
  {
    question:
      'Está sendo acusado de cometer algum crime e isso está lhe causando problemas?',
    tag: TagsOptions.criminalLaw,
    color: TagsColors.criminalLaw,
    textColor: getContrastColor(TagsColors.criminalLaw),
    subQuestions: [],
  },
  {
    question: 'Seu caso é uma questão previdenciária (INSS)?',
    tag: TagsOptions.socialSecurityLaw,
    color: TagsColors.socialSecurityLaw,
    textColor: getContrastColor(TagsColors.socialSecurityLaw),
    subQuestions: [],
  },
  {
    question: 'É uma questão relacionada ao seu emprego?',
    tag: TagsOptions.laborLaw,
    color: TagsColors.laborLaw,
    textColor: getContrastColor(TagsColors.laborLaw),
    subQuestions: [],
  },
  {
    question:
      ' Seu caso está ligado ao Juizado Especial (Juizados de pequenas causas), como Direito do Consumidor ou indenização por danos morais?',
    tag: TagsOptions.specialCourt,
    color: TagsColors.specialCourt,
    textColor: getContrastColor(TagsColors.specialCourt),
    subQuestions: [],
  },
  {
    question: 'Está sendo cobrado por impostos não pagos?',
    tag: TagsOptions.taxLaw,
    color: TagsColors.taxLaw,
    textColor: getContrastColor(TagsColors.taxLaw),
    subQuestions: [],
  },
];

export { questionsScreening };
