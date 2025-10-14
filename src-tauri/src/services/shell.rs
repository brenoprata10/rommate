use tauri::AppHandle;
use tauri_plugin_shell::ShellExt;

pub async fn run_shell(app_handle: &AppHandle) {
    let shell = app_handle.shell();
    let output = shell
        .command("echo")
        .args(["Hello from Rust!"])
        .output()
        .await
        .unwrap();
    if output.status.success() {
        println!("Result: {:?}", String::from_utf8(output.stdout));
    } else {
        println!("Exit with code: {}", output.status.code().unwrap());
    }
}
