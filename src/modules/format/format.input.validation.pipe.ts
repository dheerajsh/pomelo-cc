import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validateSync } from 'class-validator'
import { FormatInputItem } from './format.input.dto'

@Injectable()
export class FormatInputValidationPipe implements PipeTransform<ReadonlyMap<string, readonly FormatInputItem[]>> {
/**
 * Custom validation to validate input for the transform request.
 * validate each item in the request (validation criteria is on each defined field in FormatInputItem Dto)
 * returns the BadRequestException if valiation fails else return the value itself back to the controller
 * @param value input data
 * @param metadata meta information about the input
 * @returns value back if validation pass else BadRequestException
 */
  transform(value: ReadonlyMap<string, readonly FormatInputItem[]>, metadata: ArgumentMetadata): ReadonlyMap<string, readonly FormatInputItem[]> {
    for (const [key, items] of Object.entries(value)) {
      for (const item of items) {
        const object = plainToClass(FormatInputItem, item)
        const error = validateSync(object)
        if(error.length > 0) {
          throw new BadRequestException(error[0].toString())
        }
      }
    }

    return value
  }
}
