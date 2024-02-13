use orion::operators::tensor::{Tensor, TensorTrait};
use orion::operators::tensor::{U32Tensor, I32Tensor, I8Tensor, FP8x23Tensor, FP16x16Tensor, FP32x32Tensor, BoolTensor};
use orion::numbers::{FP8x23, FP16x16, FP32x32};
use orion::operators::nn::{NNTrait, FP16x16NN};

use node_sequential_99_dense_299_matmul_readvariableop_0::get_node_sequential_99_dense_299_matmul_readvariableop_0;
use node_sequential_99_dense_299_biasadd_readvariableop_0::get_node_sequential_99_dense_299_biasadd_readvariableop_0;
use node_sequential_99_dense_298_matmul_readvariableop_0::get_node_sequential_99_dense_298_matmul_readvariableop_0;
use node_sequential_99_dense_298_biasadd_readvariableop_0::get_node_sequential_99_dense_298_biasadd_readvariableop_0;
use node_sequential_99_dense_297_matmul_readvariableop_0::get_node_sequential_99_dense_297_matmul_readvariableop_0;
use node_sequential_99_dense_297_biasadd_readvariableop_0::get_node_sequential_99_dense_297_biasadd_readvariableop_0;

fn main(node_dense_297_input: Tensor<FP16x16>) -> Tensor<FP16x16> {
let node_sequential_99_dense_297_matmul_0 = TensorTrait::matmul(@node_dense_297_input, @get_node_sequential_99_dense_297_matmul_readvariableop_0());
let node_sequential_99_dense_297_biasadd_0 = TensorTrait::add(node_sequential_99_dense_297_matmul_0, get_node_sequential_99_dense_297_biasadd_readvariableop_0());
let node_sequential_99_dense_297_relu_0 = NNTrait::relu(@node_sequential_99_dense_297_biasadd_0);
let node_sequential_99_dense_298_matmul_0 = TensorTrait::matmul(@node_sequential_99_dense_297_relu_0, @get_node_sequential_99_dense_298_matmul_readvariableop_0());
let node_sequential_99_dense_298_biasadd_0 = TensorTrait::add(node_sequential_99_dense_298_matmul_0, get_node_sequential_99_dense_298_biasadd_readvariableop_0());
let node_sequential_99_dense_298_relu_0 = NNTrait::relu(@node_sequential_99_dense_298_biasadd_0);
let node_sequential_99_dense_299_matmul_0 = TensorTrait::matmul(@node_sequential_99_dense_298_relu_0, @get_node_sequential_99_dense_299_matmul_readvariableop_0());
let node_dense_299 = TensorTrait::add(node_sequential_99_dense_299_matmul_0, get_node_sequential_99_dense_299_biasadd_readvariableop_0());

        node_dense_299
    }