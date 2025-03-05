import { Injectable, Logger } from '@nestjs/common';
import { ConfigService as NConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  readonly #logger = new Logger(ConfigService.name);

  readonly image: string;
  readonly natAddr: string;
  readonly apiPort: string;
  readonly p2pPort: string;
  readonly ethRpc: string;
  readonly gnoRpc: string;
  readonly firstDataVolume: string;
  readonly nodesPerDataVolume: number;
  readonly passwordPath: string;
  readonly welcomeMsg: string;

  constructor(envConfig: NConfigService) {
    const load = <T>(key: string): T => {
      const value = envConfig.get<T>(key);
      if (value === undefined) {
        throw new Error(`No environment variable named "${key}"`);
      }
      return value;
    };

    try {
      this.image = load<string>('IMAGE');
      this.natAddr = load<string>('NAT_ADDR');
      this.apiPort = load<string>('API_PORT');
      this.p2pPort = load<string>('P2P_PORT');
      this.ethRpc = load<string>('ETH_RPC');
      this.gnoRpc = load<string>('GNO_RPC');
      this.firstDataVolume = load<string>('FIRST_DATA_VOLUME');
      this.nodesPerDataVolume = load<number>('NODES_PER_DATA_VOLUME');
      this.passwordPath = load<string>('PASSWORD_PATH');
      this.welcomeMsg = load<string>('WELCOME_MSG');
    } catch (e) {
      this.#logger.error(e);
      this.#logger.error('Failed to load config from .env file. Exiting..');
      process.exit(1);
    }
  }
}
