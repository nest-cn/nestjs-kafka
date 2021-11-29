## NestJs Kafka Client

### Description

A NestJS - KafkaJs Wrapper, wrapping on [KafkaJS](https://github.com/tulios/kafkajs)

### Installation

```bash
npm install nestjs-kafka
```

### Add it to the NestJS app.module.ts or any module

```ts
import { KafkaModule } from 'nestjs-kafka';

const serviceConfig = {
  clientConfig:  {
    clientId: 'go1-node-app',     // consumer client id
    brokers: ['localhost:9092'] // kafka broker address
  },
  consumerConfig: { groupId: "something" } // consumer group id
};

@Module({
    imports: [KafkaModule.forRoot(serviceConfig)],
    controllers: [],
    providers: [],
})
export class Module {}
```

### How to sendMessage

```ts
import {KafkaService, KafkaPayload} from "nestjs-kafka";

@Injectable()
export class TaskKafkaProductService{
    constructor(private readonly kafkaService: KafkaService) {}

    public async sendPushTask(kafkaTaskDto: KafkaTaskDto): Promise<any> {
        const message: KafkaTaskDto = kafkaTaskDto;
        const payload: KafkaPayload = {
            messageId: '' + new Date().valueOf(),
            body: message,
            messageType: TASK_PUSH_INFO,
            topicName: TASK_PUSH_INFO,
        };
        this.kafkaService.sendMessage('test-kafka', payload);
    }
}

```

### How to Subscribe Message

```ts
import {KafkaPayload, AbstractKafkaConsumer} from "nestjs-kafka";

@Injectable()
export class TaskKafkaConsumerService extends AbstractKafkaConsumer {

    constructor() {
        super();
    }
    // register topic
    protected registerTopic(): any {
        this.addTopic('task.push.info');
        this.addTopic('test-group');
    }

    @SubscribeTo('task.push.info')
    taskSubscriber(payload: string ): any {
        const data: KafkaPayload = JSON.parse(payload);
    }

    /**
     * When application or container scale up &
     * consumer group id is same for application
     * @param payload
     */
    @SubscribeToFixedGroup('test-group')
    helloSubscriberToFixedGroup(payload: KafkaPayload): any {}
}
```


