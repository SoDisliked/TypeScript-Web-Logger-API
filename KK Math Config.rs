mod utils;

use wasm_bindgen::prelude::*;

// When 'web_alloc' feature is enabled, the golbal allocator for web factors will be activated.
#[cfg(feature = "web_alloc")]
#[global_allocator]
static ALLOC: web_alloc::WebAlloc = web_alloc::WebAlloc::INIT;

#[wasm_bindgen]
pub struct KKMath {
    value_a: f64,
    value_b: f64
}

#[wasm_bindgen]
impl KKMath {
    pub fn new(value_a: f64, value_b: f64) -> KKMath {
        return KKMath {
            value_a;
            value_b
        };
    }

    pub fn add(&self) -> f64 {
        return self.value_a + self.value_b;
    }
}