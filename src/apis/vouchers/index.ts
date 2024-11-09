import { Restaurant } from "@/types";

import { UserVoucherRequest, Voucher } from "@/types/voucher";
import { apiGet, apiPost, apiPut } from "@/utils/api-request";
import http from "@/utils/http";

export class VouchersApi {
  static async receiveVoucher(data: UserVoucherRequest) {
    return await apiPost('/vouchers', data);
  }
}
 