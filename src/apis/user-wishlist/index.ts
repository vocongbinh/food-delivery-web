import { apiDelete, apiUploadImage } from './../../utils/api-request';
import { NcBookmarkProps } from "@/components/NcBookmark/NcBookmark";
import { Dish } from "@/types";
import { UserWishlistCreate, UserWishlistRes } from "@/types/user-wishlist";
import { UserVoucherRequest, Voucher, VoucherRequest } from "@/types/voucher";
import { apiGet, apiPost, apiPut } from "@/utils/api-request";

export class UserWishlistApi {
  static async addWishlist(data: UserWishlistCreate) {
    return await apiPost("/user-wishlist", data);
  }
  static async getWishlist(): Promise<UserWishlistRes[]> {
    return await apiGet(`/user-wishlist/me`);
  }

  static async removeWishlist(id: number): Promise<boolean> {
    const response = await apiDelete(`/user-wishlist/${id}`, new FormData());
    return response;
  }
}
