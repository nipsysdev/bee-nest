import { Injectable, Logger } from '@nestjs/common';
import Docker from 'dockerode';

@Injectable()
export class DockerService {
  readonly #logger = new Logger(DockerService.name);

  constructor(private readonly docker: Docker) {
    void this.#init();
  }

  async #init() {
    try {
      const dockerVersion = await this.docker.version();
      this.#logger.log(`Connected to Docker version ${dockerVersion?.Version}`);
    } catch (e) {
      this.#logger.error(e);
      this.#logger.error('Failed to connect to docker. Exiting..');
      process.exit(1);
    }
  }
}
