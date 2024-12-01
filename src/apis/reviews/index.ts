import { Review, ReviewForm } from "@/types/review";
import { Restaurant } from "@/types";
import { CartItem } from "@/types/cartItem";
import { Voucher } from "@/types/voucher";
import { apiDelete, apiGet, apiPost, apiPut } from "@/utils/api-request";

export class ReviewsApi {
  static async getReviews(restaurantId: Restaurant["id"]): Promise<Review[]> {
    return await apiGet(`/reviews/${restaurantId}`);
  }
  static async updateReview(data: Omit<Review, "id">, id: Review["id"]): Promise<boolean> {
    return await apiPut(`/reviews/${id}`, data);
  }
  static async createReview(data: ReviewForm): Promise<Review> {
    return await apiPost(`/reviews`, data);
  }
  static async deleteReview(id: Review["id"]): Promise<boolean> {
    return await apiDelete(`/reviews/${id}`, {});
  }
}
