import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN,
    ]
    transform(value: any, metadata: ArgumentMetadata) {
        console.log('Transform', value, metadata)
        value = value.toUpperCase()
        if (!this.isValidStatus(value)) {
            throw new BadRequestException(`${value} is an invalid status`)
        }
        return value
        // throw new Error("Method not implemented.");
    }
    isValidStatus(status: any) {
        return this.allowedStatuses.indexOf(status) !== -1
    }
}