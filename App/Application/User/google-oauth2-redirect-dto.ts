class GoogleOAuth2RedirectDTO {
    private code: string;
    private prompt: string;

    constructor(request) {
        this.code = request.query.code;
        this.prompt = request.query.prompt;
    }

    getCode(): string {
        return this.code;
    }

    getPrompt(): string {
        return this.prompt;
    }
}

export default GoogleOAuth2RedirectDTO;
