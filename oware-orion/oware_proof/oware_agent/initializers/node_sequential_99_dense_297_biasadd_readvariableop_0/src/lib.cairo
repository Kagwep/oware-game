use orion::operators::tensor::{FP16x16Tensor, Tensor, TensorTrait};
use orion::numbers::{FixedTrait, FP16x16};

fn get_node_sequential_99_dense_297_biasadd_readvariableop_0() -> Tensor<FP16x16> {
    let mut shape = array![18];

    let mut data = array![FP16x16 { mag: 0, sign: false }, FP16x16 { mag: 0, sign: true }, FP16x16 { mag: 6, sign: true }, FP16x16 { mag: 0, sign: false }, FP16x16 { mag: 0, sign: false }, FP16x16 { mag: 0, sign: true }, FP16x16 { mag: 14, sign: true }, FP16x16 { mag: 5, sign: false }, FP16x16 { mag: 0, sign: false }, FP16x16 { mag: 10, sign: true }, FP16x16 { mag: 0, sign: false }, FP16x16 { mag: 1, sign: true }, FP16x16 { mag: 15, sign: false }, FP16x16 { mag: 0, sign: false }, FP16x16 { mag: 16, sign: true }, FP16x16 { mag: 0, sign: false }, FP16x16 { mag: 0, sign: false }, FP16x16 { mag: 7, sign: false }];

    TensorTrait::new(shape.span(), data.span())
}