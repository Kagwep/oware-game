use orion::operators::tensor::{FP16x16Tensor, Tensor, TensorTrait};
use orion::numbers::{FixedTrait, FP16x16};

fn get_node_sequential_99_dense_299_matmul_readvariableop_0() -> Tensor<FP16x16> {
    let mut shape = array![9, 1];

    let mut data = array![FP16x16 { mag: 929, sign: false }, FP16x16 { mag: 1874, sign: true }, FP16x16 { mag: 2597, sign: false }, FP16x16 { mag: 4877, sign: true }, FP16x16 { mag: 2440, sign: false }, FP16x16 { mag: 1393, sign: true }, FP16x16 { mag: 51, sign: false }, FP16x16 { mag: 3383, sign: true }, FP16x16 { mag: 2510, sign: false }];

    TensorTrait::new(shape.span(), data.span())
}