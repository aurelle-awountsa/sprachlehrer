export default function makePatchUserController({editUserService}) {
    return async (httpRequest) => {

        try {
            const {...userInfo} = httpRequest.body;
            const {userId: id} = httpRequest.params;
            const toEdit = {
                ...userInfo,
                id: httpRequest.params.userId
            };

            const updatedUser = await editUserService(toEdit);

            if (updatedUser.message) {
                return {
                    statusCode: 404,
                    body: {
                        success: false,
                        ...updatedUser,
                    }
                }
            }

            if (!updatedUser) {
                return {
                    statusCode: 404,
                    body: {message: "No valid entry found for provided ID"}
                }
            }

            return {
                statusCode: 200,
                body: {
                    message: "User info updated successfully",
                    updatedUser: {
                        username: updatedUser.username,
                        email: updatedUser.email
                    },
                    request: {
                        type: "GET",
                        url: `http://localhost:5000/api/user/${id}`
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
