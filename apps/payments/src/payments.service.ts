/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateChargeDto, NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PaymentsService {
  private readonly configService: ConfigService;
  private readonly stripe: Stripe;

  constructor(
    configService: ConfigService, 
    @Inject(NOTIFICATIONS_SERVICE) private readonly notificationsService: ClientProxy,
    
  ) {
    this.configService = configService;
    this.stripe = new Stripe(
      this.configService.get('STRIPE_SECRET_KEY'), 
      {
        apiVersion: '2023-10-16',
      }
    );
  }

  async createCharge({ email, amount }: CreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      payment_method_types: ['card'],
      currency: 'usd',
    })
    // Emit an event called notify-email that contains the user email (push)
    this.notificationsService.emit('notify-email', {
      email,
      text: `Your payment of $${ amount * 100 } has completed successfully`
    });
    return paymentIntent
  }
}
