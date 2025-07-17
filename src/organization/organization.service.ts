import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { promises } from 'dns';
import { OrganizationDto } from './dto/organization.dto';

@Injectable()
export class OrganizationService {
    constructor(private prisma: PrismaService) {}

    public async create(createOrganizationDto: CreateOrganizationDto): Promise<OrganizationDto> {
        const organization = await this.prisma.organization.create({
            data: createOrganizationDto,
        })
        return {
            id: organization.id,
            name: organization.name,
            createdAt: organization.createdAt.toDateString(),
        }; 
    }
}
