import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Flight } from '../Models/flight.model';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel('Flight') private readonly bookingModel: Model<Flight>,
  ) {}

  async createBooking(customerId: number): Promise<Flight> {
    const newBooking = new this.bookingModel({
      customerId,
      createdAt: new Date(),
    });
    return await newBooking.save();
  }

  async deleteBooking(_id: string, customerId: number): Promise<boolean> {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Invalid book ID');
    }
    const booking = await this.bookingModel.findByIdAndDelete({
      _id,
      customer_id: customerId,
    });
    return !!booking;
  }
  async getBooking(_id: string, customerId: number): Promise<Flight> {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Invalid book ID');
    }
    const booking = await this.bookingModel.findOne({
      _id,
      customer_id: customerId,
    });
    if (!booking) {
      throw new BadRequestException('Book does not exist');
    }
    return booking;
  }

  async getFlightsByCustomer(customerId: number): Promise<Flight[]> {
    return this.bookingModel.find({ customerId });
  }
}
