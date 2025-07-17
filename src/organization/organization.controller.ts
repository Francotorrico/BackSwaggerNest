import {
     Controller,
      Post,
      Body 
    } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationDto } from './dto/organization.dto';

@Controller('organization')
@ApiTags('organization')
export class OrganizationController {
    constructor(private organizationService: OrganizationService) {}
    
    @Post()
    @ApiResponse({status:201,type: OrganizationDto})
    public async create(@Body() CreateOrganizationDto: CreateOrganizationDto) {
        return this.organizationService.create(CreateOrganizationDto);
    }




}
