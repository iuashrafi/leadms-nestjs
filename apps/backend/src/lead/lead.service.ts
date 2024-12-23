import { LeadRequestShapes } from './lead.controller';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LeadService {
  constructor() {}
  async createLead(body: LeadRequestShapes['createLead']['body']) {}
}
