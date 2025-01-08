import { useEffect, useState } from 'react';
import { GetProp, Upload, UploadProps, message } from 'antd';
import './index.css'
import { getLocalAccessToken } from '@/shared/utils/token';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

interface IProps {
    disabled?: boolean
    initUrl?: string
}
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

const ImageUploader = ({ disabled, initUrl }: IProps) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        if (initUrl) {
            setImageUrl(initUrl);
        }
    }, [])

    const handleChange: UploadProps['onChange'] = (info) => {
        console.log('info', info.file.status)
        if (info.file.status === 'error') {
            setLoading(false);
            message.error("서버 이슈로 이미지 올리기기에 실패했습니다.")
            return;
        }
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <>
            <Upload
                disabled={disabled}
                action={`${process.env.REACT_APP_DOMAIN_URL}/s3/upload`}
                headers={{ "Authorization": `Bearer ${getLocalAccessToken()}` }}
                withCredentials={true}
                name='avatar'
                listType="picture-circle"
                onChange={handleChange}
                className="avatar-uploader"
                showUploadList={false}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </>
    );
};

export default ImageUploader;