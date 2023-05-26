import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Select,
  Layout,
  Upload,
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./index.module.css";

const { TextArea } = Input;
const { Content } = Layout;
const uploadButton = (
  <div>
    <PlusOutlined />
    <div
      style={{
        marginTop: 8,
      }}
    >
      Upload
    </div>
  </div>
);

// convert a file (picture) to base64 code
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EquipForm = ({ onFinish, editData }) => {
  const [form] = Form.useForm();
  const [photo, setPhoto] = useState();
  const [preview, setPreview] = useState(false);

  const removePhoto = () => setPhoto(null);
  const beforeUpload = (file) => {
    let isOk = file.type === "image/jpeg" || file.type === "image/png";
    if (!isOk) {
      message.error("You can only upload JPG/PNG file!");
    }
    isOk = file.size < 512 * 1024;
    if (!isOk) {
      message.error("Image must smaller than 512KB!");
    }
    if (isOk) {
      getBase64(file).then(setPhoto);
    }
    return false;
  };
  const handleFinish = (form) => {
    form.photo = photo;
    onFinish(form);
  }

  useEffect(() => {
    if (editData) {
      const { photo, ...rest } = editData;
      form.setFieldsValue(rest);
      setPhoto(photo);
    }
  }, [editData]);

  return (
    <Content className={styles.content}>
      <Form
        name="equipment"
        className={styles.form}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 18 }}
        form={form}
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter",
            },
          ]}
        >
          <Input placeholder="e.g. BenQ Projector MS560" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[
            {
              required: true,
              message: "Please enter",
            },
          ]}
        >
          <Input placeholder="e.g. Projector" />
        </Form.Item>
        <Form.Item
          label="Stock"
          name="stock"
          rules={[
            {
              required: true,
              message: "Please enter",
            },
          ]}
        >
          <InputNumber style={{ width: 150 }} />
        </Form.Item>
        <Form.Item name="photo" label="Photo">
          <Upload
            listType="picture-card"
            beforeUpload={beforeUpload}
            onRemove={removePhoto}
            onPreview={() => setPreview(true)}
            fileList={photo ? [{ uid: "-1", url: photo }] : []}
          >
            {photo ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Modal
          open={preview}
          footer={null}
          title="Equipment photo"
          onCancel={() => setPreview(false)}
        >
          <img
            style={{
              width: "100%",
            }}
            src={photo}
          />
        </Modal>
        <Form.Item label="Description" name="description">
          <TextArea rows={5} />
        </Form.Item>
        <Form.Item label="State" name="state" initialValue="available">
          <Select
            style={{ width: 150 }}
            options={[
              { value: "available", label: "Available" },
              { value: "unavailable", label: "Unavailable" },
            ]}
          />
        </Form.Item>
        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit" className={styles.btn}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default EquipForm;
