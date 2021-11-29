import { OnModuleInit } from '@nestjs/common';
import { SUBSCRIBER_OBJ_REF_MAP } from './KafkaDecorator';

export abstract class AbstractKafkaConsumer implements OnModuleInit {

  constructor() {}

  protected abstract registerTopic();

  public async onModuleInit(): Promise<void> {
    this.registerTopic();
  }

  protected addTopic(topicName) {
    SUBSCRIBER_OBJ_REF_MAP.set(topicName, this);
  }
}
