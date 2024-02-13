use orion::operators::tensor::{FP16x16Tensor, Tensor, TensorTrait};
use orion::numbers::{FixedTrait, FP16x16};

fn get_node_sequential_99_dense_298_biasadd_readvariableop_0() -> Tensor<FP16x16> {
    let mut shape = array![9];

    let mut data = array![FP16x16 { mag: 59, sign: true }, FP16x16 { mag: 0, sign: true }, FP16x16 { mag: 120, sign: true }, FP16x16 { mag: 16, sign: false }, FP16x16 { mag: 77, sign: false }, FP16x16 { mag: 8, sign: false }, FP16x16 { mag: 0, sign: true }, FP16x16 { mag: 208, sign: true }, FP16x16 { mag: 202, sign: true }];

    TensorTrait::new(shape.span(), data.span())
}