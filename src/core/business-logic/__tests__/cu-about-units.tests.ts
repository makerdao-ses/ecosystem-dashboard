import { CuStatusEnum } from '../../enums/cu-status.enum';
import { CuMipAboutBuilder } from '../builders/cu-about/cu-mip.builder';
import { getMipsStatus } from '../core-unit-about';

test('Get date for status on CuMip', () => {
  const result = new CuMipAboutBuilder()
    .withStatus(CuStatusEnum.Accepted)
    .build();
  expect(getMipsStatus(result)).toBe(result.accepted);
});
