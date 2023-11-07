use axum::{
    extract::ws::{WebSocketUpgrade, WebSocket},
    routing::get,
    response::{IntoResponse, Response},
    Router,
};
use std::io;

async fn handler(ws: WebSocketUpgrade) -> Response {
    ws.on_upgrade(handle_socket)
}

async fn handle_socket(mut socket: WebSocket) {
    while let Some(msg) = socket.recv().await {
        let msg = if let Ok(msg) = msg {
            msg
        } else {
            // client disconnected
            return;
        };

        if socket.send(msg).await.is_err() {
            // client disconnected
            return;
        }
    }
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/", get(handler));

    axum::Server::bind(&"0.0.0.0:5501".parse().unwrap())
    .serve(app.into_make_service())
    .await
    .unwrap();
} 
