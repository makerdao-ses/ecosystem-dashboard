import { DateTime } from 'luxon';

export const CURRENT_MONTH = DateTime.now().toFormat('y-MM-dd');
export const CURRENT_MINUS_1_MONTH = DateTime.now()
  .set({ day: 1 })
  .minus({ month: 1 })
  .toFormat('y-MM-dd');
export const CURRENT_MINUS_2_MONTH = DateTime.now()
  .set({ day: 1 })
  .minus({ month: 2 })
  .toFormat('y-MM-dd');
export const CURRENT_MINUS_3_MONTH = DateTime.now()
  .set({ day: 1 })
  .minus({ month: 3 })
  .toFormat('y-MM-dd');
export const CURRENT_PLUS_1_MONTH = DateTime.now()
  .set({ day: 1 })
  .plus({ month: 1 })
  .toFormat('y-MM-dd');
export const MARKDOWN_SENTENCE_DESCRIPTION =
  'The Protocol Engineering Core Unit secures a wealth of engineering, security, research and smart contract development experience ensuring that the Maker protocol can safely continue to grow as a DeFi leader';
export const MARKDOWN_PARAGRAPH_DESCRIPTION = '## Responsibilities\n\n_The Protocol Engineering Team’s responsibility is to extend the functionality of the Maker protocol, assist with the maintenance and operation of existing smart contracts and ensure the safety and correctness of protocol design and implementation';
export const MARKDOWN_PARAGRAPH_IMAGE = 'https://gateway-proxy-bee-9-0.gateway.ethswarm.org/bzz/6b6b084402b6cccb9e892ff2563a7b836259103e02a0cac59057a14d3ac9f0ef';
