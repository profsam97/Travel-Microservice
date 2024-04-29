import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Booking } from '../Models/book.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
  ) {}

  async createBooking(customerId: number): Promise<Booking> {
    const newBooking = new this.bookingModel({
      customerId,
      createdAt: new Date(),
    });
    return await newBooking.save();
  }

  async deleteBooking(_id: string, customerId: string): Promise<boolean> {
    if (!Types.ObjectId.isValid(_id)) {
      throw new BadRequestException('Invalid book ID');
    }

    const booking = await this.bookingModel.findByIdAndDelete({
      _id,
      customer_id: customerId,
    });
    return !!booking; // return true if booking was deleted (i.e., booking exists)
  }
  async getBooking(_id: string, customerId: number): Promise<Booking> {
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
  async getBookingsByCustomer(customerId: number): Promise<Booking[]> {
    const books = this.bookingModel.find();
    console.log(books);
    return this.bookingModel.find({ customerId });
  }
}
