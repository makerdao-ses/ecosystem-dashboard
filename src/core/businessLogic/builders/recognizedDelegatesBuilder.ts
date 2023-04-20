import type { DelegateSocialDto, RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';

export class RecognizedDelegatesBuilder {
  private readonly _delegates: RecognizedDelegatesDto;

  constructor() {
    this._delegates = {
      name: '',
      image: '',
      latestVotingContract: '',
      socials: {} as DelegateSocialDto,
      numberDai: 0,
    } as RecognizedDelegatesDto;
  }

  withName(name: string): RecognizedDelegatesBuilder {
    this._delegates.name = name;
    return this;
  }

  withImage(image: string): RecognizedDelegatesBuilder {
    this._delegates.image = image;
    return this;
  }

  withLatestVotingContract(contract: string): RecognizedDelegatesBuilder {
    this._delegates.latestVotingContract = contract;
    return this;
  }

  withSocials(socials: DelegateSocialDto): RecognizedDelegatesBuilder {
    this._delegates.socials = socials;
    return this;
  }

  withNumberDai(numberDai: number): RecognizedDelegatesBuilder {
    this._delegates.numberDai = numberDai;
    return this;
  }

  build(): RecognizedDelegatesDto {
    return this._delegates;
  }
}
