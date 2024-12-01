
import { UserVoucherRequest } from "@/types/voucher";
import { apiPost } from "@/utils/api-request";

export class VouchersApi {
  static async receiveVoucher(data: UserVoucherRequest) {
    return await apiPost('/vouchers', data);
  }
}
 