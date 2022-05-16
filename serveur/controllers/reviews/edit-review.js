export default function makePatchReviewController({editReviewService}) {
    return async (httpRequest) => {

        try {
            const {...userInfo} = httpRequest.body;
            const {reviewId: id, userEmail: email} = httpRequest.params;
            const toEdit = {...userInfo, id, email};

            const updatedUser = await editReviewService(toEdit);

            if (updatedUser.message) {
                return {
                    statusCode: 404,
                    body: {
                        ...updatedUser,
                    }
                }
            }

            return {
                statusCode: 200,
                body: {
                    message: "Review updated successfully !",
                    updatedUser: {
                        email: email,
                        updatedReview: updatedUser.updatedDocument.reviews[updatedUser.index]
                    }
                }
            }
        } catch (e) {
            // TODO: Error logging
            console.log(e);
            if (e.name === 'RangeError') {
                return {
                    statusCode: 404,
                    body: {
                        error: e.message
                    }
                }
            }
            return {
                statusCode: 400,
                body: {
                    error: e.message
                }
            }
        }
    }
}
