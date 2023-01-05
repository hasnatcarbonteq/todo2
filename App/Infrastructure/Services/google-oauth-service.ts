import { google } from "googleapis";
import Config from "@infrastructure/Config";
import axios from "axios";

const { googleOauth } = Config;

class GoogleOAuthService {
    private readonly client;

    constructor() {
        this.client = new google.auth.OAuth2(
            googleOauth.GOOGLE_OAUTH_CLIENT_ID,
            googleOauth.GOOGLE_OAUTH_CLIENT_SECRET,
            googleOauth.GOOGLE_OAUTH_REDIRECT_URI
        );
    }

    async getAuthUrl() {
        const authUrl = this.client.generateAuthUrl({
            access_type: "offline",
            scope: [
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile",
            ],
        });

        return authUrl;
    }

    async getAccessToken(code: string) {
        try {
            const { tokens } = await this.client.getToken(code);

            this.client.setCredentials(tokens);
            return tokens;
        } catch (error) {
            return error;
        }
    }

    async getUserInfo() {
        const oauth2 = google.oauth2({
            auth: this.client,
            version: "v2",
        });

        const userInfo = await oauth2.userinfo.get();
        return userInfo.data;
    }
}

export default GoogleOAuthService;
