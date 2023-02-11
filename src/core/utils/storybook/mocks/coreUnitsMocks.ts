import { CoreUnitsBuilder } from '@ses/core/business-logic/builders/core-units.builder';
import { CuMipBuilder } from '@ses/core/business-logic/builders/cu-mip.builder';
import { CuCategoryEnum } from '@ses/core/enums/cu-category.enum';
import { CuStatusEnum } from '@ses/core/enums/cu-status.enum';

export const SESCoreUnitMocked = new CoreUnitsBuilder()
  .withId('1')
  .withShortCode('SES')
  .withName('Sustainable Ecosystem Scaling')
  .withImage('https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png')
  .withDescription(
    "The aim of SES is to sustainably grow the Maker Protocol's moats by systematically removing barriers between the decentralized workforce, capital, and work."
  )
  .addCuMip(
    new CuMipBuilder()
      .withStatus(CuStatusEnum.Accepted, '2021-05-25')
      .withMipCode('MIP39')
      .withFormalSubmission('2021-05-25')
      .build()
  )
  .addCategory(CuCategoryEnum.Technical)
  .addCategory(CuCategoryEnum.Growth)
  .addCategory(CuCategoryEnum.Support)
  .addCategory(CuCategoryEnum.Operational)
  .addSocialMediaChannel({
    discord: 'https://discord.gg/h7GKvqDyDP',
    forumTag: 'ses-001',
    linkedIn: 'https://www.linkedin.com/company/makerdao-ses/',
    twitter: 'https://www.twitter.com/ses-makerdao',
    youtube: 'https://www.youtube.com/channel/UC9c35O2H6fq8fB2CGzzP1bw/about',
    github: 'https://github.com/ses-makerdao',
    website: 'https://ses.makerdao.network',
  })
  .build();
