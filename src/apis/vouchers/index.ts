import { UserVoucherRequest, Voucher, VoucherRequest } from "@/types/voucher";
import { apiGet, apiPost, apiPut } from "@/utils/api-request";

export class VouchersApi {
  static async receiveVoucher(
    data: UserVoucherRequest
  ): Promise<{ productDiscount: Voucher }> {
    return await apiPost("/vouchers", data);
  }
  static async postVoucher(request: VoucherRequest): Promise<Voucher> {
    return await apiPost("/discounts", request);
  }

  static async getVouchers(id: Voucher["id"]): Promise<Voucher[]> {
    const response = await apiGet(`/discounts/restaurant/${id}`);
    return response;
  }

  static async getVoucherById(id: Voucher["id"]): Promise<Voucher> {
    return await apiGet(`/discounts/${id}`);
  }

  static async putVoucher(request: VoucherRequest): Promise<Voucher> {
    return await apiPut(`/discounts`, request);
  }
}
