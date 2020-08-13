FROM python:3.7 as builder

COPY . /app
WORKDIR /app
RUN pip install -r requirements.txt

FROM nginx
EXPOSE 5000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html   