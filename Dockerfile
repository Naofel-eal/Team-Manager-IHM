FROM node:latest as builder

WORKDIR /usr/local/app
COPY . .

RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=builder /usr/local/app/dist/team-manager-ihm/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80