import { Injectable, Logger } from '@nestjs/common';
import Docker from 'dockerode';

@Injectable()
export class DockerService {
  private readonly logger = new Logger(DockerService.name);

  constructor(private readonly docker: Docker) {
    this.docker.version((err, dockerVersion) => {
      if (err || !dockerVersion) {
        this.logger.error(err);
        this.logger.error('Failed to connect to docker. Exiting..');
        process.exit(1);
      }
      this.logger.log(`Connected to Docker version ${dockerVersion?.Version}`);
    });
  }
}
