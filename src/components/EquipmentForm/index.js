import { getEquipmentList } from "@/api";
import { EquipmentForm } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, DatePicker, Form, Image, Input, InputNumber, message, Select } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

import Content from "../Content";
import styles from "./index.module.css";

const Option = Select.Option;
const { TextArea } = Input;

const EquipmentPage = ({ title, editData }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState([]);
  const [preview, setPreview] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    getCategoryList({ all: true }).then((res) => {
      setCategoryList(res.data);
    });
  }, []);

  useEffect(() => {
    if (editData) {
      const { category, purchaseDate, maintenanceDate, cover, ...rest } = editData;
      const data = {
        ...rest,
        category: category && category._id,
        purchaseDate: purchaseDate ? dayjs(purchaseDate) : undefined,
        maintenanceDate: maintenanceDate ? dayjs(maintenanceDate) : undefined,
      };
      setPhoto(cover);
      form.setFieldsValue(data);
    }
  }, [editData, form]);

  const handleFinish = async (values) => {
    console.log("%c [ values ]-53", "font-size:13px; background:pink; color:#bf2c9f;", values);
    // Edit
    if (values.publishAt) {
      values.publishAt = dayjs(values.publishAt).valueOf();
    }
    if (editData && editData._id) {
      await equipmentUpdate(editData._id, values);
      message.success("Edit successfully");
    } else {
      await equipmentAdd(values);
      message.success("Create successfully");
    }
    router.push("/equipment");
  };

  const handlePreview = () => {
    setPreview(form.getFieldValue("photo"));
  };

  return (
    <>
      <Content title={title}>
        <Form
          name="equipment"
          form={form}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 18 }}
          className={styles.form}
          initialValues={editData ? editData : {}}
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="name"
            rules={[
              {
                required: true,
                message: "Input title",
              },
            ]}
          >
            <Input placeholder="Please enter" />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              {
                required: true,
                message: "Please choose equipment category",
              },
            ]}
          >
            <Select>
              {categoryList.map((category) => (
                <Option value={category._id} key={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Picture" name="photo">
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 65px)" }}
                value={photo}
                onChange={(e) => {
                  setPhoto(e.target.value);
                  form.setFieldValue("photo", e.target.value);
                }}
              />
              <Button type="primary" onClick={handlePreview}>
                Preview
              </Button>
            </Input.Group>
          </Form.Item>
          {preview && (
            <Form.Item label=" " colon={false}>
              <Image width={200} height={200} alt="Picture" src={preview} />
            </Form.Item>
          )}
          <Form.Item label="Publish Date" name="publishAt" className={styles.publishAt}>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Stock" name="stock">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <TextArea className={styles.textarea} />
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles.btn}
            >
              {editData && editData._id ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </>
  );
};

export default EquipmentForm;
