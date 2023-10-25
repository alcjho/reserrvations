import { Logger, NotFoundException } from '@nestjs/common';
import { Model, Types, FilterQuery, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: Logger;
    constructor(readonly model: Model<TDocument>) {}

    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        const createDocument = new this.model({
            ...document,
            _id: new Types.ObjectId(),
        });
        return (await createDocument.save()).toJSON() as unknown as TDocument;
    }

    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(
            filterQuery,
            {},
            { lean: true },
        );

        if (!document) {
            this.logger.warn('Document not found with filterQuery');
            throw new NotFoundException(
                `Document with query ${filterQuery} not found`,
            );
        }
        return document as TDocument;
    }

    async findOneAndUpdate(
        filterQuery: FilterQuery<TDocument>, 
        updateQuery: UpdateQuery<TDocument>,
    ) {
        const document = await this.model.findOneAndUpdate(
            filterQuery,
            updateQuery,
            {
                lean: true,
                new: true
            }
        );
        if (!document) {
            this.logger.warn('Document not found with filterQuery');
            throw new NotFoundException(
                `Document not found with ${updateQuery}`,
            );
        }
    }

    async find(filterQuery: FilterQuery<TDocument>): Promise<Array<TDocument>>{
        return (await this.model.find(
            filterQuery,
            {},
            { lean: true },
        )) as Array<TDocument>;
    }

    async findOneAndDelete(filterQuery: FilterQuery<TDocument>){
        return this.model.findOneAndDelete(filterQuery, { lean: true });
    }
}
