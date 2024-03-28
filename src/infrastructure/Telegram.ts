import * as TelegramBot from 'node-telegram-bot-api';
import * as momentTz from "moment-timezone";
import { Logger } from '../core';
import ProductsWarehouseDto from '../data/dtos/ProductsWarehouseDto';
import { MOMENT_DATE_FORMAT } from '../libs/Contant';

class TelegramClient {
    private groupId: string;
    public bot: TelegramBot;
    constructor(data: any) {
        this.groupId = data.groupId;
        this.bot = new TelegramBot(data.secretTelegram, { polling: false });
    }

    public async sendMessageNewProductItem(item: ProductsWarehouseDto): Promise<void> {
        try {
            const message = `
            Tên sản phẩm: ${item.name} 
            \nSố lượng: ${item.total} 
            \nGiá ban đầu: ${item.priceOriginal} 
            \nGiá bán ra: ${item.priceDisplay} 
            \nNgười tạo: ${item.user?.name}
            \nNội dung: Thêm mới sản phẩm vào kho
            `;
            if (item.picture) {
                return await this.sendPhoto(item.picture, message);
            } else {
                return await this.sendMessage(message);
            }
        } catch (error) {
            Logger.error(error);
        }
    }

    public async sendMessageReleaseItem(item: {name: string, releaseTotal: number, restTotal: number, priceDisplay: number, userName: string, picture: string}): Promise<void> {
        try {
            const message = `
            Tên sản phẩm: ${item.name} 
            \nSố lượng thực tế: ${item.releaseTotal + item.restTotal} 
            \nSố lượng bán: ${item.releaseTotal} 
            \nSố lượng còn lại: ${item.restTotal} 
            \nĐơn giá: ${item.priceDisplay ? item.priceDisplay + ".000 VND" : "0 VND"} 
            \nDoanh thu: ${item.priceDisplay && item.releaseTotal ? item.priceDisplay * item.releaseTotal + ".000 VND" : "0 VND"} 
            \nNgười thực hiện: ${item.userName}
            \nThời gian thực hiện: ${momentTz().format(MOMENT_DATE_FORMAT.FULL_DATE_TIME)}
            \nGhi chú: None
            `;
            if (item.picture) {
                return await this.sendPhoto(item.picture, message);
            } else {
                return await this.sendMessage(message);
            }
        } catch (error) {
            Logger.error(error);
        }
    }

    public async sendMessage(message: string): Promise<void> {
        try {
            await this.bot.sendMessage(this.groupId, message, { parse_mode: 'Markdown' });
        } catch (error) {
            Logger.error(error);
        }
    }

    public async sendPhoto(file: Buffer | string, cap?: string): Promise<void> {
        try {
            await this.bot.sendPhoto(this.groupId, file, { caption: cap });
        } catch (error) {
            Logger.error(error);
        }
    }

    public async sendVideo(fileBuffer: Buffer): Promise<void> {
        try {
            await this.bot.sendVideo(this.groupId, fileBuffer);
        } catch (error) {
            Logger.error(error);
        }
    }
}

export default TelegramClient;