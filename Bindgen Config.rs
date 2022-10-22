// Test suite for Web browsing action.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_text;
use wasm_bindgen_text::*;

wasm_bindgen_text_configure!(run_in_browser);

#[wasm_bindgen_text]
fn pass() {
    assert_eq! (1+1, 2);
}